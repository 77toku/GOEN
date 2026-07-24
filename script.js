
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('show'));
}

const choices = document.getElementById('choices');
const question = document.getElementById('question');
const stepLabel = document.getElementById('stepLabel');
const progressBar = document.getElementById('progressBar');
const result = document.getElementById('result');
let firstChoice = '';

const secondChoices = [
  ['まず相談しながら整理したい', '相談'],
  ['サイトや仕組みを作りたい', '制作'],
  ['詳しい人を紹介してほしい', '紹介'],
  ['自分に合う方法を知りたい', '提案']
];

const messages = {
  '発信': 'あなたの想いや強みを言葉とデザインで整理し、紹介されやすいプロフィールやLPへつなげます。',
  '集客': '売り込みではなく信頼から相談につながる導線を、Web・紹介・AI活用を組み合わせて設計します。',
  '改善': '今の仕事や発信の流れを整理し、AIやWebで負担を減らせるポイントを一緒に見つけます。',
  '紹介': '課題を丁寧に伺い、GOENのご縁の中から相性のよい専門家やサービスをおつなぎします。'
};

choices.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (!firstChoice) {
    firstChoice = button.dataset.value;
    stepLabel.textContent = 'STEP 2 / 2';
    question.textContent = 'どんな進め方が理想ですか？';
    progressBar.style.width = '100%';
    choices.innerHTML = secondChoices.map(([label, value]) =>
      `<button type="button" data-value="${value}">${label}</button>`
    ).join('');
    return;
  }

  choices.hidden = true;
  question.hidden = true;
  stepLabel.textContent = 'YOUR GOEN PLAN';
  result.hidden = false;
  result.innerHTML = `
    <h4>あなたに合うのは「対話から始めるGOENプラン」</h4>
    <p>${messages[firstChoice]}</p>
    <p>いきなり契約を決める必要はありません。まずは今の状況を聞かせてください。</p>
    <a class="button" href="https://timerex.net/s/77.tokuzo_b2fd/01e7028c" target="_blank" rel="noopener">無料相談を予約する</a>
  `;
});

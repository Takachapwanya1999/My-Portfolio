const education = [
  {
    title: 'Senior Full-Stack Developer',
    url: '#',
    description: 'Tech Innovations Ltd.',
    additionalText: 'Leading development of scalable web applications using React, Node.js, and AWS.',
    date: '2025'
  },
  {
    title: 'Full-Stack Developer',
    url: '#',
    description: 'Web Solutions Inc.',
    additionalText: 'Developed full-stack e-commerce platforms and internal tools.',
    date: '2023 - 2024'
  },
  {
    title: 'Frontend Developer',
    url: '#',
    description: 'Creative Studio',
    additionalText: 'Built responsive user interfaces with JavaScript and CSS frameworks.',
    date: '2021 - 2023'
  }
];

const ul = document.querySelector('.my-journey');
if (ul) {
  education.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('education-item');
    const a = document.createElement('a');
    a.href = item.url;
    a.target = "_blank";
    a.textContent = item.title;
    a.classList.add('education-link');
    const icon = document.createElement('i');
    icon.classList.add('fas', 'fa-external-link-alt');
    const pDescription = document.createElement('p');
    pDescription.textContent = item.description;
    pDescription.classList.add('education-text');
    const additionalText = document.createElement('p');
    additionalText.textContent = item.additionalText;
    additionalText.classList.add('education-text');
    const pDate = document.createElement('p');
    pDate.textContent = item.date;
    pDate.classList.add('education-date');
    a.appendChild(icon);
    li.appendChild(a);
    li.appendChild(pDescription);
    li.appendChild(additionalText);
    li.appendChild(pDate);
    ul.appendChild(li);
  });
}

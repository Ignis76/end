// Личные данные, биография и опыт. Изменения применяются после обновления страницы.
window.PROFILE = {
  name: 'VesiloeLichiko',
  intro: 'Выпускник Astana IT College с двумя дипломами. С 2025 года изучаю Cybersecurity в Astana IT University.',
  about: 'Мой путь в IT: разработка программного обеспечения, практика в Astana Hub и кибербезопасность.',
  aboutMore: 'В 2022 году я поступил в Astana IT College. Во время учёбы прошёл стажировку в отделе аналитики Astana Hub и работал над Tech Orda 2024. В 2025 году получил два диплома и продолжил обучение в Astana IT University.',
  discord: 'vesiloelichiko',
  github: 'https://github.com/Ignis76',
  steam: 'https://steamcommunity.com/id/636363663',
  instagram: 'https://www.instagram.com/vesiloe_lichiko',
  interests: ['Разработка ПО', 'Кибербезопасность', 'Аналитика'],
  biography: [
    { chapter: 'I', title: 'За ником', subtitle: 'VesiloeLichiko / мой путь в IT', paragraphs: ['В интернете меня знают как VesiloeLichiko. За этим ником - учёба в IT, опыт работы над реальным проектом и интерес к кибербезопасности.', 'Мой путь прошёл через Astana IT College, стажировку в Astana Hub и поступление в Astana IT University. В этой книге - основные главы этой истории.'], ornament: '◈' },
    { chapter: 'II', title: 'Первый шаг', subtitle: '2022 / Astana IT College', paragraphs: ['В 2022 году я поступил в Astana IT College. Здесь начался мой путь в профессиональном IT-образовании.', 'Колледж я окончил в 2025 году сразу с двумя дипломами: оператора программного обеспечения и разработчика программного обеспечения.'], ornament: '⌘' },
    { chapter: 'III', title: 'Реальная практика', subtitle: '2024 / Astana Hub', paragraphs: ['В 2024 году я проходил стажировку в отделе аналитики Astana Hub и участвовал в ведении проекта Tech Orda 2024.', 'Работал с бизнес-процессами и расчётами, ставил задачи, участвовал в рабочих созвонах. Также занимался тестированием и поиском багов.'], ornament: '◇' },
    { chapter: 'IV', title: 'Два диплома', subtitle: '2025 / окончание колледжа', paragraphs: ['В 2025 году я окончил Astana IT College. Первый диплом - синий, по квалификации «Оператор программного обеспечения».', 'Второй диплом - красный, с отличием, по квалификации «Разработчик программного обеспечения». Две квалификации стали итогом моего обучения в колледже.'], ornament: '✦' },
    { chapter: 'V', title: 'Новая глава', subtitle: '2025 / Astana IT University', paragraphs: ['В 2025 году я поступил в Astana IT University на направление Cybersecurity - кибербезопасность.', 'После колледжа и практики в Astana Hub я продолжил обучение в университете. Теперь к моему опыту в программном обеспечении добавляется изучение кибербезопасности.'], ornament: '⟐' },
    { chapter: 'VI', title: 'На связи', subtitle: 'По ту сторону книги', paragraphs: ['Образование и практика - часть моей истории. На этом сайте можно познакомиться со мной ближе и найти мои профили.', 'На GitHub я - Ignis76, в Discord - vesiloelichiko. Напиши, если хочешь обсудить код, кибербезопасность, совместный проект или просто познакомиться.'], ornament: '✧' }
  ],
  achievements: [
    { title: 'Практика в Astana Hub', text: 'Стажировка в отделе аналитики. Tech Orda 2024: бизнес-процессы, расчёты, задачи, созвоны, тестирование и поиск багов.', date: '2024', label: 'ОПЫТ', tone: 'violet', art: 'analysis' },
    { title: 'Оператор ПО', text: 'Astana IT College. Квалификация «Оператор программного обеспечения» - синий диплом.', date: '2025', label: 'СИНИЙ ДИПЛОМ', tone: 'blue', art: 'diploma' },
    { title: 'Разработчик ПО', text: 'Astana IT College. Квалификация «Разработчик программного обеспечения» - красный диплом, с отличием.', date: '2025', label: 'КРАСНЫЙ ДИПЛОМ', tone: 'red', art: 'diploma' },
    { title: 'Cybersecurity', text: 'Поступление в Astana IT University на направление «Кибербезопасность».', date: '2025', label: 'УНИВЕРСИТЕТ', tone: 'green', art: 'shield' }
  ],
  projects: [
    { id: 'college', title: 'Два диплома', subtitle: '2022-2025 / ASTANA IT COLLEGE', category: 'education', art: 'diploma', description: 'Оператор и разработчик программного обеспечения. Синий и красный дипломы.', detail: 'В 2022 году я поступил в Astana IT College, а в 2025 году окончил его с двумя дипломами. Синий диплом - по квалификации «Оператор программного обеспечения». Красный диплом, с отличием, - по квалификации «Разработчик программного обеспечения».', action: 'Посмотреть результаты', url: '#personal-achievements', tags: ['Оператор ПО', 'Разработчик ПО', 'Диплом с отличием'] },
    { id: 'tech-orda', title: 'Tech Orda 2024', subtitle: '2024 / ASTANA HUB', category: 'experience', art: 'analysis', description: 'Стажировка в отделе аналитики и участие в ведении проекта.', detail: 'Во время стажировки в отделе аналитики Astana Hub я участвовал в ведении Tech Orda 2024: работал с бизнес-процессами и расчётами, ставил задачи и участвовал в рабочих созвонах. Также занимался тестированием и поиском багов.', action: 'Мой путь', url: '#personal-achievements', tags: ['Бизнес-процессы', 'Постановка задач', 'Тестирование'] },
    { id: 'university', title: 'Кибербезопасность', subtitle: 'С 2025 / ASTANA IT UNIVERSITY', category: 'education', art: 'shield', description: 'Следующая ступень образования - направление Cybersecurity.', detail: 'В 2025 году я поступил в Astana IT University на направление Cybersecurity. Это следующий этап моего образования после Astana IT College, двух квалификаций в программном обеспечении и практики в Astana Hub.', action: 'К моей истории', url: '#about', tags: ['Cybersecurity', 'Astana IT University'] }
  ]
};

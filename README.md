# React frontend task

# Мастер добавления заказов

Необходимо реализовать мастер добавления заказов с использованием React.

Ограничения:

- Не использовать css-фреймворки.

## Подготовка

1. Создать форк репозитория [https://github.com/two-legs/piano-test-task-react](https://github.com/two-legs/piano-test-task-react)
2. В папке src/api находится mock-реализация api, которую нужно использовать при разработке мастера.


## Мастер создания заказов

Дизайн в figma с флоу мастера:

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D0%253A1%26viewport%3D204%252C305%252C0.4454238712787628](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D0%253A1%26viewport%3D204%252C305%252C0.4454238712787628)

### Main screen

Отображает список заказов и кнопку вызова мастера.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A2](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A2)

### Terms of delivery

Отображает условия доставки и чекбокс для их принятия.

Следующий шаг недоступен, пока соглашение не принято.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A494](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A494)

### Name

Два поля с именем пользователя. Валидация - поля не должны быть пустыми.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A877](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A877)

### Shipping options

Шаг с ветвлением. Можно выбрать два варианта:

- Courier delivery
- Pickup points

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A955](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A955)

### Pickup points

Асинхронно загружаемый список пунктов самовывоза.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1028](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1028)

### *Courier delivery*. Address

Поля для ввода адреса. Валидация - поля не должны быть пустыми.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1078](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1078)

### *Courier delivery*. Phone number

Поле ввода номера телефона. Валидация - поля не должны быть пустыми и содержать только цифры. После ввода номер отправляется на сервер.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1138](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1138)

### *Courier delivery*. Confirm phone

Поле для подтверждения номера из четырех символов. Валидация проходит асинхронно на сервере.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1402](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1402)

### Confirm order

Отображает summary для мастера. При клике на submit отправляет данные на бэкенд.

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1477](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1477)

### Result

Результат создания заказа (успех/не успех). Если успешный - в этом случае заказ добавляется в список.

Успех:

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1523](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1523)

Ошибка:

[https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1607](https://www.figma.com/embed?embed_host=notion&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F2ifwkkhfcVuRFoXyT2Ujeo%2FFrontend-test%3Fnode-id%3D1%253A1607)

## Требования

### Обязательные

- [ ]  Компонента мастера должна быть универсальной - необходимо максимально упростить создание новых мастеров и добавление/изменение текущего мастера.
- [ ]  Верстка должна соответствовать figma.
- [ ]  Валидация форм (простая).

### Дополнительно

- [ ]  Анимация переходов между состояниями.
- [ ]  Маска/валидация поля для номера телефона.

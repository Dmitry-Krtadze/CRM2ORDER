const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Массив для хранения заказов
const orders = [];

// Middleware
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));
app.use(express.json()); // Для обработки JSON-тела запросов

// Проверка работы сервера
app.get('/', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

// Обработка POST запросов
app.post('/', (req, res) => {
    const { name, telegram, comment, color, modelId } = req.body;

    if (!name || !telegram || !modelId) {
        return res.status(400).json({ error: 'Все поля (name, telegram, modelId) должны быть заполнены' });
    }

    const newOrder = {
        id: orders.length + 1,
        name,
        telegram,
        comment,
        color,
        modelId,
        status: 'В работе',
    };

    orders.push(newOrder);
    console.log('Новый заказ:', newOrder);
    res.status(201).json({ message: 'Заказ успешно добавлен', order: newOrder });
});

// Получение всех заказов
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Изменение статуса заказа
app.patch('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = orders.find(o => o.id == id);
    if (!order) {
        return res.status(404).json({ error: 'Заказ не найден' });
    }

    order.status = status;
    res.json({ message: 'Статус заказа обновлен', order });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});

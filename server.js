const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let orders = []; // Массив для хранения заказов

// Получение всех заказов
app.get('/orders', (req, res) => {
    res.json(orders);
});

// Добавление нового заказа
app.post('/orders', (req, res) => {
    const { name, telegram, comment, color, modelId } = req.body;
    const order = {
        id: orders.length + 1,
        name,
        telegram,
        comment,
        color,
        modelId,
        status: 'В работе' // Статус по умолчанию
    };
    orders.push(order);
    res.status(201).json(order);
});

// Изменение статуса заказа
app.patch('/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = orders.find(o => o.id == id);
    if (!order) {
        return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    res.json(order);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

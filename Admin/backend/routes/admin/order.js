const express = require('express');
const db = require('../../db');
const router = express.Router();

// Route GET: Lấy tất cả đơn hàng và thông tin trạng thái từ follow_order
router.get('/', (req, res) => {
    const query = `
        SELECT 
            o.order_id, 
            o.address, 
            o.phone_number, 
            o.total, 
            o.pay_status, 
            o.full_name, 
            fo.order_status,
            oi.product_id, 
            oi.quantity_items, 
            oi.price,
            p.product_name,
            p.imageUrl,
            o.acc_id
        FROM \`order\` o
        LEFT JOIN follow_order fo ON o.order_id = fo.order_id
        LEFT JOIN order_items oi ON o.order_id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.product_id
        ORDER BY o.order_id DESC;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error('Lỗi khi lấy tất cả đơn hàng:', err);
            return res.status(500).json({ message: 'Lỗi khi lấy tất cả đơn hàng' });
        }

        const orders = {};
        result.forEach(row => {
            if (!orders[row.order_id]) {
                orders[row.order_id] = {
                    order_id: row.order_id,
                    address: row.address,
                    phone_number: row.phone_number,
                    total: row.total,
                    pay_status: row.pay_status,
                    full_name: row.full_name,
                    order_status: row.order_status,
                    acc_id: row.acc_id,
                    order_items: []
                };
            }
            if (row.product_id) {
                orders[row.order_id].order_items.push({
                    product_id: row.product_id,
                    product_name: row.product_name,
                    quantity_items: row.quantity_items,
                    price: row.price,
                    image_url: row.imageUrl
                });
            }
        });

        res.status(200).json(Object.values(orders));
    });
});

router.post('/create', (req, res) => {
  const { order_id, order_status } = req.body;

  // Kiểm tra dữ liệu hợp lệ
  if (!order_id || !order_status) {
    return res.status(400).json({ message: 'Thiếu thông tin order_id hoặc trạng thái đơn hàng' });
  }

  // Truy vấn SQL để thêm đơn hàng mới
  const insertQuery = `
    INSERT INTO follow_order (order_id, order_status)
    VALUES (?, ?);
  `;

  db.query(insertQuery, [order_id, order_status], (err, result) => {
    if (err) {
      console.error('Lỗi khi thêm đơn hàng:', err);
      return res.status(500).json({ message: 'Lỗi khi thêm đơn hàng' });
    }

    res.status(201).json({ message: 'Tạo đơn hàng thành công', order_id });
  });
});

router.put('/:orderId/status', (req, res) => {
  const { orderId } = req.params;
  const { order_status } = req.body;

  // Kiểm tra dữ liệu hợp lệ
  if (!order_status) {
      return res.status(400).json({ message: 'Trạng thái đơn hàng không hợp lệ' });
  }

  // Truy vấn SQL để cập nhật trạng thái
  const updateQuery = `
      UPDATE follow_order 
      SET order_status = ? 
      WHERE order_id = ?;
  `;

  db.query(updateQuery, [order_status, orderId], (err, result) => {
      if (err) {
          console.error('Lỗi khi cập nhật trạng thái đơn hàng:', err);
          return res.status(500).json({ message: 'Lỗi khi cập nhật trạng thái đơn hàng' });
      }

      if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
      }

      res.status(200).json({ message: 'Cập nhật trạng thái đơn hàng thành công' });
  });
});


// Route GET: Lấy trạng thái đơn hàng từ follow_order
router.get('/:orderId/status', (req, res) => {
    const { orderId } = req.params;

    // Truy vấn trạng thái đơn hàng từ bảng follow_order
    const query = `
        SELECT order_status 
        FROM follow_order 
        WHERE order_id = ?;
    `;

    db.query(query, [orderId], (err, result) => {
        if (err) {
            console.error('Lỗi khi lấy trạng thái đơn hàng:', err);
            return res.status(500).json({ message: 'Lỗi khi lấy trạng thái đơn hàng' });
        }

        // Kiểm tra xem có đơn hàng nào tồn tại không
        if (result.length === 0) {
            return res.status(404).json({ message: 'Không tìm thấy trạng thái đơn hàng' });
        }

        // Trả về trạng thái của đơn hàng
        res.status(200).json({ order_status: result[0].order_status });
    });
});

module.exports = router;

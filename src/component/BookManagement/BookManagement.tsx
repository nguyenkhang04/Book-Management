import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Form, Input, InputNumber, Popconfirm } from "antd";
import { v4 as uuidv4 } from "uuid";
import {
  addBook,
  deleteBook,
  editBook,
  fetchBooks,
} from "../../redux/features/BookSlice";
import { AppDispatch, RootState } from "../../redux/store/store";

export type TBook = {
  id: string;
  title: string;
  author: string;
  year: number;
  createAt?: number;
};

const BookManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: books, loading } = useSelector(
    (state: RootState) => state.books
  );

  const [editBookData, setEditBookData] = useState<TBook | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const onFinish = (values: Omit<TBook, "id">) => {
    if (editBookData) {
      dispatch(editBook({ id: editBookData.id, updatedBook: values }));
    } else {
      const newBook: TBook = {
        ...values,
        id: uuidv4(),
        createAt: Date.now(),
      };
      dispatch(addBook(newBook));
    }

    setEditBookData(null);
    form.resetFields();
  };

  const handleEdit = (book: TBook) => {
    setEditBookData(book);
    form.setFieldsValue(book);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
  };

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Author", dataIndex: "author", key: "author" },
    { title: "Year", dataIndex: "year", key: "year" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: TBook) => (
        <div>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item name="title" label="Title :" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author :" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="year"
          label="Year :"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber min={1900} max={9999} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {editBookData ? "Update Book" : "Add Book"}
          </Button>
        </Form.Item>
      </Form>

      <Table
        columns={columns}
        dataSource={books}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default BookManagement;

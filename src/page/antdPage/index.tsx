import React from 'react';
import { Button, Form, Input, Select } from 'antd';

export default function () {
  const [formInstance] = Form.useForm();
  return (
    <div>
      <Form
        form={formInstance}
        onFinish={(value) => {
          console.log(value);
        }}>
        <Form.Item label="搜索内容" name="search">
          {/* 这里可以暂时性的解决密码自动填充的问题 */}
          <Input autoComplete="new-password" name="xxxxxx" />
        </Form.Item>
        <Form.Item label="名字" name="name">
          <Select
          // options={[
          //   {
          //     label: 'baba',
          //     value: 1
          //   },
          //   {
          //     label: 'mama',
          //     value: 2
          //   }
          // ]}
          >
            <Select.Option value="1">baba</Select.Option>
            <Select.Option value="2">mama</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      {/* <input
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            formInstance.validateFields().then((value) => {
              console.log(value);
            });
          }
        }}
      /> */}
      {/* <Button
        onClick={() => {
          formInstance.validateFields().then((value) => {
            console.log(value);
          });
        }}>
        校验
      </Button> */}
    </div>
  );
}

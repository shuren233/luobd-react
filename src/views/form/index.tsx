import React, { useState } from "react";

import { Form, Input, Select, Button, DatePicker } from "antd";

interface FormItemConfig {
    name: string;
    label: string;
    type: string;
    rules?: any[];
    options?: string[];
    // onSubmit?: (data: any) => void;
}

interface FormData {
    [key: string]: string | undefined;
}

const config = [
    {
        label: "用户名",
        type: "text",
        name: "username",
        rules: [{ required: true, message: "请输入用户名" }],
    },
    {
        label: "密码",
        type: "password",
        name: "password",
        rules: [{ required: true, message: "请输入密码" }],
    },
    { label: "性别", type: "select", name: "gender", options: ["男", "女"] },
    { label: "生日", type: "date", name: "birthday" },
];

const FormItem: React.FC<{ label: string; children: React.ReactNode }> = ({
    label,
    children,
}) => <Form.Item label={label}>{children}</Form.Item>;

const DynamicForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({});

    const handleChange = (name: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (values: Record<string, any>) => {
        console.log(values, "values@@");
    };

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
        >
            {config.map((item) => (
                <FormItem key={item.name} label={item.label}>
                    {item.type === "text" && (
                        <Input
                            style={{ width: "240px" }}
                            type="text"
                            value={formData[item.name] || ""}
                            onChange={(e) =>
                                handleChange(item.name, e.target.value)
                            }
                        />
                    )}
                    {item.type === "password" && (
                        <Input
                            style={{ width: "240px" }}
                            type="password"
                            value={formData[item.name] || ""}
                            onChange={(e) =>
                                handleChange(item.name, e.target.value)
                            }
                        />
                    )}
                    {item.type === "select" && (
                        <Select
                            style={{ width: "240px" }}
                            value={formData[item.name] || ""}
                            onChange={(e) => handleChange(item.name, e)}
                        >
                            {item.options?.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                    )}
                    {item.type === "date" && (
                        <DatePicker
                            style={{ width: "240px" }}
                            onChange={(e) => handleChange(item.name, e)}
                        />
                    )}
                </FormItem>
            ))}
            <Button type="primary" onClick={() => handleSubmit}>
                提交
            </Button>
        </Form>
    );
};

export default DynamicForm;

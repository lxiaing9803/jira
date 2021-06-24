import { useAuth } from 'context/auth-context';
import React, { FormEvent } from 'react';



export const LoginScreen = () => {

    const { login } = useAuth()

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 不写as HTMLInputElement的话就会把event.currentTarget.elements[0]当做一个element类型
        const username = (event.currentTarget.elements[0] as HTMLInputElement).value;
        const password = (event.currentTarget.elements[1] as HTMLInputElement).value;
        login({ username, password })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="userName">用户名</label>
                <input type="text" id="userName" />
            </div>
            <div>
                <label htmlFor="password">密码</label>
                <input type="password" id="password" />
            </div>
            <button type="submit">登录</button>
        </form>
    );
};

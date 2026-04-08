// hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  // 可根据实际需求添加更多字段
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null
  });

  // 检查本地存储中的登录状态
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // 从 localStorage 或 sessionStorage 获取 token
      const token = localStorage.getItem('authToken');
      
      if (token) {
        // 验证 token 是否有效
        const userData = await validateToken(token);
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
          error: null
        });
      } else {
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: '验证登录状态失败'
      });
    }
  };

  const login = async (username: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // 发送登录请求
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('登录失败');
      }

      const result = await response.json();
      
      // 存储 token
      localStorage.setItem('authToken', result.token);
      
      setAuthState({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
        error: null
      });

      return result;
    } catch (error: any) {
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: error.message || '登录过程中发生错误'
      });
      throw error;
    }
  };

  const logout = () => {
    // 清除本地存储的认证信息
    localStorage.removeItem('authToken');
    
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null
    });
  };

  const validateToken = async (token: string): Promise<User> => {
    // 实现 token 验证逻辑
    const response = await fetch('/api/validate-token', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Token 无效');
    }

    return await response.json();
  };

  return {
    ...authState,
    login,
    logout,
    checkAuthStatus
  };
};

export default useAuth;
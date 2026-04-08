import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom"; // 导入导航钩子
import { useState, useEffect } from "react"; // 导入状态钩子和副作用钩子

export default function LoginForm() {
  const [phone, setPhone] = useState(""); // 手机号状态
  const [password, setPassword] = useState(""); // 密码状态
  const [rememberMe, setRememberMe] = useState(false); // 记住密码状态
  const navigate = useNavigate(); // 获取导航函数

  // 组件挂载时检查是否已保存登录信息
  useEffect(() => {
    const savedPhone = localStorage.getItem("savedPhone");
    const savedPassword = localStorage.getItem("savedPassword");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    
    if (savedRememberMe && savedPhone && savedPassword) {
      setPhone(savedPhone);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 阻止默认表单提交行为
    
    // 这里可以添加登录验证逻辑
    console.log("登录尝试:", { phone, password, rememberMe });
    
    // 如果用户选择记住密码，则保存登录信息
    if (rememberMe) {
      localStorage.setItem("savedPhone", phone);
      localStorage.setItem("savedPassword", password);
      localStorage.setItem("rememberMe", "true");
    } else {
      // 如果用户取消记住密码，则删除之前保存的信息
      localStorage.removeItem("savedPhone");
      localStorage.removeItem("savedPassword");
      localStorage.removeItem("rememberMe");
    }
    
    // 假设登录验证成功，跳转到 Home 页面
    // 实际项目中应在此处验证用户凭据后再跳转
    localStorage.setItem("authToken", phone + "-" + password); // 设置模拟认证令牌
    navigate("/"); // 跳转到 Home 组件
  };

  // 处理记住密码复选框变化
  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  return (
    <main 
      className="flex items-center justify-end h-screen p-8"
      style={{
        backgroundImage: "url('/public/background.jpeg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 登录卡片 - 靠右显示 */}
      <Card className="max-w-sm w-full sm:w-96">
        <CardHeader>
          <CardTitle className="text-xl text-center">登录</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}> {/* 添加表单提交处理器 */}
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid gap-4">
                  <Label htmlFor="phone">手机号</Label>
                  <Input 
                    id="phone" 
                    placeholder="" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)} // 更新手机号状态
                  />
                </div>
              </div>
              <div className="grid gap-4">
                <Label htmlFor="password">密码</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // 更新密码状态
                />
              </div>
              
              {/* 记住密码复选框 */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="rememberMe" className="text-sm font-normal">
                  记住密码
                </Label>
              </div>
              
              <Button type="submit" className="w-full">
                确定
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </main>
  );
}
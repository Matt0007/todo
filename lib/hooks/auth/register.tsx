'use client'
import { useState } from "react";
import { toast } from "react-hot-toast";
import { RegisterData } from "@/lib/type/auth";
import { useRouter } from "next/navigation";
export const useRegister = () => {
    const [registerLoading,setRegisterLoading] = useState(false);
    const [registerError,setRegisterError] = useState<string | null>(null);
    const router = useRouter();

    const register = async (RegisterData:RegisterData) => {
        try {
            setRegisterLoading(true);
            setRegisterError(null);

            const response = await fetch("/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(RegisterData)
            })
            const data = await response.json();
            if(response.ok){
                toast.success(data.message);
                router.push("/auth/login");
            }else{  
                setRegisterError(data.message);
            }
        } catch (error) {
            setRegisterError(error as string);
        } finally {
            setRegisterLoading(false);
        }
    }
    return {register,registerLoading,registerError}
}
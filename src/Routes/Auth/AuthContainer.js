import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import userInput from "../../Hooks/userInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";
export default () => {
    const [action, setAction] = useState("logIn");
    const username = userInput("");
    const firstName = userInput("");
    const lastName = userInput("");
    const email = userInput("");
    const secret = userInput("");
    const [ requestSecretMutation ] = useMutation(LOG_IN, 
        { 
            variables: { email : email.value }
        }
    );

    const [ createAccountMutation ] = useMutation(CREATE_ACCOUNT,
        {
            variables: { 
                username: username.value,
                email: email.value,
                firstName: firstName.value,
                lastName: lastName.value
            }
        }    
    );

    const [ confirmSecretMutation ] = useMutation(CONFIRM_SECRET,
        {
            variables: {
                secret: secret.value,
                email: email.value
            }
        }    
    );

    const [ localLogInMutation ] = useMutation(LOCAL_LOG_IN);

    
    const onSubmit = async (e) => {
        e.preventDefault();
        if (action === "logIn") {
            if (email.value !== "") {
                try {
                    const { data : { requestSecret } } = await requestSecretMutation();
                    if (!requestSecret) {
                        toast.error("이메일이 존재하지 않습니다.");
                    } else {
                        toast.success("이메일을 전송하였습니다.");
                        setAction("confirm");
                    }
                } catch {
                    toast.error("서버로부터 응답을 받을 수 없습니다. 다시 시도해주세요.");
                }
            } else {
                toast.error("이메일을 입력해주세요.");
            }
        } else if (action === "signUp") {
            if(username.value !== "" && email.value !== "" && firstName.value !== "" && lastName.value !== "") {
                try {
                    const { data: {createAccount } } = await createAccountMutation();
                    if (!createAccount) {
                        //TODO: 후에 잘못된 입력이 있는 칸 빨간 표시하기.
                        // 즉, 이메일 존재여부를 알려주는 api가 필요.
                        toast.error("잘못된 입력입니다.");
                    } else {
                        toast.success("회원가입이 완료되었습니다.");
                        setAction("logIn");
                    }
                } catch {
                    toast.error("서버로부터 응답을 받을 수 없습니다. 다시 시도해주세요.");
                }
            } else {
                toast.error("정보를 입력해주세요.");
            }
        } else if (action === "confirm") {
            if(secret.value !== "") {
                try {
                    const { data: { confirmSecret:token }} = await confirmSecretMutation();
                    if (!token) {
                        toast.error("암호가 틀렸습니다.");
                    }
                    else {
                        toast.success("Welcom");
                        
                        //TODO: 로그인 구현.
                        localLogInMutation({variables:{token}});
                    }
                } catch {
                    toast.error("서버로부터 응답을 받을 수 없습니다. 다시 시도해주세요.");
                }
            } else {
                toast.error("인증 정보를 입력해주세요.");
            }
        }
    }

    return <AuthPresenter 
        setAction={setAction} 
        action={action} 
        username={username} 
        firstName={firstName} 
        lastName={lastName} 
        email={email}
        secret={secret}
        onSubmit={onSubmit}
    />;
}
export interface loginResponse{
    userName: string;
    isAuthenticated: boolean;
    token: string;
}

export const getUserMock = ()=>{
    return { 
        userName: 'Chano',
        isAuthenticated: true,
        token: 'ABCXYZ123'
    }
}
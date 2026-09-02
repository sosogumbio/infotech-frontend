const API_URL = import.meta.env.VITE_API_SERVER_URL;

class AuthRequests {

    private serverUrl: string;
    private endpointLogin: string;
    private endpointProduto: string;

    constructor() {
        this.serverUrl = API_URL;
        this.endpointLogin = '/api/login';
        this.endpointProduto = '/api/produtos'; // ajuste se sua rota for diferente
    }

    async login(login: { email: string, senha: string }) {
        try {
            const response = await fetch(`${this.serverUrl}${this.endpointLogin}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(login)
            });

            console.log('STATUS:', response.status);
            console.log('URL:', response.url);

            const data = await response.json();

            console.log('RESPOSTA DO BACKEND:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Falha no login');
            }

            if (data.auth) {
                this.persistToken(data.token, data.usuario, data.auth);
            }

            return true;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    async enviarFormularioProduto(formData: FormData) {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`${this.serverUrl}${this.endpointProduto}`, {
                method: 'POST',
                headers: {
                    // Não definir 'Content-Type' aqui: o browser define
                    // automaticamente o boundary correto pra multipart/form-data
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: formData
            });

            console.log('STATUS:', response.status);
            console.log('URL:', response.url);

            const data = await response.json();

            console.log('RESPOSTA DO BACKEND:', data);

            if (!response.ok) {
                throw new Error(data.message || 'Falha ao enviar produto');
            }

            return data;

        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    persistToken(token: string, usuario: { id_usuario: number, nome: string, email: string, role: string }, isAuth: boolean) {
        localStorage.setItem('token', token);
        localStorage.setItem('nome', usuario.nome);
        localStorage.setItem('idUsuario', usuario.id_usuario.toString());
        localStorage.setItem('email', usuario.email);
        localStorage.setItem('role', usuario.role);
        localStorage.setItem('isAuth', isAuth.toString());
    }

    removeToken() {
        const keys = [
            'token',
            'nome',
            'idUsuario',
            'email',
            'role',
            'isAuth'
        ];

        keys.map(key => localStorage.removeItem(key));
        window.location.href = `/login`;
    }

    checkTokenExpiry() {
        const token = localStorage.getItem('token');

        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp;
            const now = Math.floor(Date.now() / 1000);

            if (expiry < now) {
                this.removeToken();
                return false;
            }

            return true;
        }

        return false;
    }
}

export default new AuthRequests();
class Config {

}

class DevConfig extends Config {
    apiAddress: string = 'http://localhost:8082/api/';
    apiLogin: string = 'http://localhost:8082/api/auth/login';
}

class ProdConfig extends Config {
    apiAddress: string = '';
    apiLogin: string = '';
}

const appConfig = process.env.NODE_ENV === 'development' ? new DevConfig() : new ProdConfig();

export default appConfig;

export interface IRegistration {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    date: string;
    role: string;
}

export interface IClasses {
    [propName: string]: string,
}
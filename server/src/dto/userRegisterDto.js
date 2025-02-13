class UserRegisterDto {
    constructor(username, email, name, surname, password){
        this.username = username;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.password = password
    }

    getFullName(){
        return this.name + " " + this.surname;
    }
}
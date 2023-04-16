import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs'

@Injectable()
export class UsersService {
    
    constructor(private readonly http: HttpService) {}

    async getUsers(): Promise<any[]> {
        
        const { data } = await firstValueFrom(
            this.http.get<any[]>('http://forum-world-core:5000/api/users').pipe(
              catchError((error: AxiosError) => {
                console.log(error)
                throw 'An error happened!'
                }),
            ));

        return data;       
    }

    async createUser(dto: CreateUserDto) {
        const { data } = await firstValueFrom(
            this.http.post("http://forum-world-core:5000/api/users", dto).pipe(
                catchError((error: AxiosError) => {
                    console.log(error)
                    throw 'An error happened!'
                }),
            ));

        return data;
    }
}

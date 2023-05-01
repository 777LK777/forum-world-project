import { Injectable, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, catchError } from 'rxjs';
import { AxiosResponse, AxiosError } from 'axios';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoreApiService implements OnApplicationBootstrap {
    private apiOrigin: string;

    constructor(
        private configService: ConfigService, 
        private httpService: HttpService,
        private pathFragment: string) { }

    async onApplicationBootstrap() {
      this.apiOrigin = await this.configService.get('api-path.origin');
    }

        get<T>(url: string = '', config?): Observable<AxiosResponse<T>> {
          const path = `${this.apiOrigin}${this.pathFragment}${url}`;
          return this.httpService.get<T>(path, config).pipe(
            catchError((error: AxiosError) => {
                console.log(`get method to ${path} was throw error:\r${error}`)
                return new Observable<AxiosResponse<T>>()
              }),
          );
        }
      
        post<T>(data?, config?): Observable<AxiosResponse<T>>;      
        post<T>(url: string, data?, config?): Observable<AxiosResponse<T>> {
          const path = `${this.apiOrigin}${this.pathFragment}${url}`;
          return this.httpService.post<T>(`${path}`, data, config).pipe(
            catchError((error: AxiosError) => {
                console.log(`post method to ${path} was throw error:\r${error}`)
                return new Observable<AxiosResponse<T>>()
              }),
            );
        }
      
        put<T>(data?, config?): Observable<AxiosResponse<T>>;
        put<T>(url?: string, data?, config?): Observable<AxiosResponse<T>> {
          const path = `${this.apiOrigin}${this.pathFragment}${url}`;
          return this.httpService.put<T>(`${path}`, data, config).pipe(
            catchError((error: AxiosError) => {
                console.log(`put method to ${path} was throw error:\r${error}`)
                return new Observable<AxiosResponse<T>>()
              }),
            );
        }
      
        delete<T>(url: string, config?): Observable<AxiosResponse<T>> {
          const path = `${this.apiOrigin}${this.pathFragment}${url}`;
          return this.httpService.delete<T>(`${path}`, config).pipe(
            catchError((error: AxiosError) => {
                console.log(`delete method to ${path} was throw error:\r${error}`)
                return new Observable<AxiosResponse<T>>()
              }),
            );
        }}

@Injectable()
export class CoreApiServiceFactory {
    create(
        configService: ConfigService, 
        httpService: HttpService,
        pathFragment: string) : CoreApiService {
            const service = new CoreApiService(configService, httpService, pathFragment)
            return service;
        }
}

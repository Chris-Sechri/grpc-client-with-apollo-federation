import { Observable } from "rxjs";

export interface AuthService {
    findOne(id: AuthById): Observable<any>;
}

interface Auth { 
    id: string;
    name: string;
}

interface AuthById {
    id: number;
}
import { GetCurrentUser } from "../apis/auth";

export async function rootLoader(){
    return  GetCurrentUser();
}
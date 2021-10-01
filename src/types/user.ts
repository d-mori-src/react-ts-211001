export type User = {
    id: number;
    name: string;
    age: number;
    personalColor?: string; // <プロパティ名>?　 string | undefined と同義
    hobbies?: string[];
}
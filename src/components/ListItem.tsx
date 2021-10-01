import { User } from '../types/user';

export const ListItem: React.FC<User> = (props) => {
    const { id, name, age, personalColor, hobbies } = props;

    return (
        <p style={{ color: personalColor }}>
            {id}: {name}({age}) {hobbies?.join(" / ")}
        </p>
    );
}

import Typography from '@mui/material/Typography';


export default function MessageComponent({ message }: { message: string }) {
    return <Typography variant="body1">{message}</Typography>;
};

import { CircularProgress } from "@material-ui/core";

const Loader = () => (
    <div style={{
        position: 'absolute',
        top: 0,
        height: '100vh',
        width: '100vw',
        backgroundColor: 'white',
        position: "fixed",
        top: '0',
        overflow: 'hidden',
        zIndex: '1'
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%'
        }}>
            <CircularProgress />
        </div>
    </div>
);

export default Loader;
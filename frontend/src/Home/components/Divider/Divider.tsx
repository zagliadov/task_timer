import { FC } from 'react';

type IDividerProps = {
    propStyle: string,
}

const Divider: FC<IDividerProps> = ({ propStyle }) => {

    return (
        <div className={propStyle}>
            <span>:</span>
        </div>
    );
};

export default Divider;
import React from 'react'
import { MutatingDots } from 'react-loader-spinner'

type Props = {
    clx?: string;
}

const Spinner = ({clx}: Props) => {
    return (
        <div className={clx}>
            <MutatingDots
                height="100"
                width="100"
                color="#805f48"
                secondaryColor='#F5DFBB'
                radius='12.5'
                ariaLabel="mutating-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default Spinner
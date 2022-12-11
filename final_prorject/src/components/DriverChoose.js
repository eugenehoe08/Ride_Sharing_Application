import React, { useState } from 'react'

const DriverChoose = () => {
    const [focus, setFocus] = useState(false)
    return (
        <div className="w-full font-bold text-left flex items-center text-3xl p-4 overflow-hidden">
            {focus ? 'Where to?' : 'Pick a passenger up?'}
        </div>
    )
}

export default DriverChoose
import React, { useState } from 'react'

function showCounter({ comboFood }) {
    const [counter, setCounter] = useState(comboFood.count)

    return (
        <div className="detail__counts">
            <span
                className="detail__counts__crease"

                onClick={() => setCounter(counter - 1)}
            >-</span>

            < span className="detail__counts__count">
                {counter}
            </span>
            <span
                className="detail__counts__crease"
                onClick={() => setCounter(counter + 1)}
            >+</span>
        </div >
    )

}

export default showCounter

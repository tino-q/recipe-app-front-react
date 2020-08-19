import { useState } from 'react';

export default (defaultValue = false) => {
    const [flag, setFlag] = useState(!!defaultValue);
    const toggleFlag = () => setFlag(i => !i);
    return [flag, toggleFlag];
} 
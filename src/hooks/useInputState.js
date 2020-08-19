import { useState } from 'react';

export default (defaultValue = "") => {
    const [value, setValue] = useState(defaultValue);
    const onValueChanged = (e) => setValue(e.target.value);
    return [value, onValueChanged];
} 
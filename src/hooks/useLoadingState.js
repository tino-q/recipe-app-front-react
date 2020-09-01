import { useState } from 'react';

export default (defaultValue = false) => {
    const [loading, setLoading] = useState(defaultValue);
    const [error, setError] = useState();

    const whileLoading = (promiseFn) =>
        Promise.resolve(setLoading(true))
            .then(promiseFn)
            .catch(setError)
            .then(() => setLoading(false));

    return {
        loading,
        whileLoading,
        error,
        clearError: () => setError(undefined),
    };
} 
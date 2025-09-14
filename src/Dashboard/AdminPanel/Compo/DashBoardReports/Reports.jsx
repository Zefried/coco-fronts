import React, { useEffect } from 'react';
import { AuthAction } from '../../../../CustomStateManage/OrgUnits/AuthState';
import axios from 'axios';

const Reports = () => {
    const { token } = AuthAction.getState('sunState');

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await axios.post(
                    '/api/admin/reports',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`  // Fixed syntax here
                        }
                    }
                );
                console.log(res.data.data);
            } catch (err) {
                console.error('Failed to fetch report:', err);
            }
        };

        fetchReport();
    }, [token]);

    return (
        <>
            <p>This is report compo</p>
        </>
    );
};

export default Reports;

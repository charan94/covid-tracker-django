import React, { useState } from 'react';
import Loader from '../shared/loader';
import DataTable from "react-data-table-component";
import '../../assets/scss/Toplist.scss';
import Button from 'react-bootstrap/Button';
import CModal from '../shared/CModal';
import CountryStats from './countrystats';

const CCheckBox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="form-groupd mt-2">
        <input
            type="checkbox"
            className="form-control-lg"
            ref={ref}
            {...rest}
            onClick={onClick}
        />
        <label className="form-label" onClick={onClick} />
    </div>
));

const TopList = (props) => {

    const { countryStats, loading } = props;

    const [selectedRows, setSelectedRows] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [title, setTitle] = useState('');
    const [modalBody, setModalBody] = useState('');
    const [modalSize, setModalSize] = useState('lg');

    const columns = [
        {
            name: "Country Name",
            selector: "country",
            sortable: false,
            center: true
        },
        {
            name: "Total Cases",
            selector: "total_cases",
            sortable: false,
            center: true
        },
        {
            name: "Total Deaths",
            selector: "total_deaths",
            sortable: false,
            center: true
        },
        {
            name: "Total Recovered",
            selector: "total_recovered",
            sortable: false,
            center: true
        },
        {
            name: "Active Cases",
            selector: "active_cases",
            sortable: false,
            center: true
        }
    ];

    const onRowSelect = (event) => {
        setSelectedRows(event?.selectedRows || []);
    }

    const handleCompare = (event) => {
        setModalSize('lg');
        setTitle('Country Stats Comparision');
        setModalBody(<CountryStats countryList={selectedRows} />)
        setShowModal(true);
    }

    const getDataTable = () => {
        if (loading || !countryStats) {
            return <Loader loading={loading} />
        }

        return (
            <>
                <DataTable
                    title="Country Stats"
                    columns={columns}
                    data={countryStats.filter(d => d.country !== 'World')}
                    pagination
                    selectableRows
                    striped
                    highlightOnHover
                    responsive
                    subHeader
                    onSelectedRowsChange={onRowSelect}
                    className={'table-responsive'}
                    selectableRowsComponent={CCheckBox}
                    subHeaderComponent={<Button variant="secondary" className="mr-auto" disabled={selectedRows.length < 2} onClick={handleCompare}>Compare</Button>} />
                <CModal show={showModal} hideModal={setShowModal} title={title} modalBody={modalBody} size={modalSize} dialogClass={`country-stats-modal`} />
            </>
        )
    }

    return getDataTable();
};

export default TopList;
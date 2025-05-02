import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
      if (Object.hasOwnProperty.call(errorObj.errors, key)) {
        const element = errorObj.errors[key];
        if (element?.message) {
          errMsg[key] = element.message;
        }
      }
    }
    return errMsg.length ? errMsg : errorObj.message ? { error : errorObj.message} : {};
};

const DayPlansCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [itineraryID, setItineraryID] = useState([])

    useEffect(() => {
        let init  = {};
        if (!_.isEmpty(props?.entity)) {
            init = initilization({ ...props?.entity, ...init }, [itineraryID], setError);
        }
        set_entity({...init});
        setError({});
    }, [props.show]);

    const validate = () => {
        let ret = true;
        const error = {};
          
            if (_.isEmpty(_entity?.summary)) {
                error["summary"] = `Summary field is required`;
                ret = false;
            }
        if (!ret) setError(error);
        return ret;
    }

    const onSave = async () => {
        if(!validate()) return;
        let _data = {
            itineraryID: _entity?.itineraryID?._id,date: _entity?.date,summary: _entity?.summary,
            createdBy: props.user._id,
            updatedBy: props.user._id
        };

        setLoading(true);

        try {
            
        const result = await client.service("dayPlans").create(_data);
        const eagerResult = await client
            .service("dayPlans")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[result._id]}, $populate : [
                {
                    path : "itineraryID",
                    service : "itineraries",
                    select:["title"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Create info", message: "Info Day Plans updated successfully" });
        props.onCreateResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
            props.alert({ type: "error", title: "Create", message: "Failed to create in Day Plans" });
        }
        setLoading(false);
    };

    

    

    useEffect(() => {
                    // on mount itineraries
                    client
                        .service("itineraries")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleItinerariesId } })
                        .then((res) => {
                            setItineraryID(res.data.map((e) => { return { name: e['title'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Itineraries", type: "error", message: error.message || "Failed get itineraries" });
                        });
                }, []);

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const itineraryIDOptions = itineraryID.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Create Day Plans" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max scalein animation-ease-in-out animation-duration-1000" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="dayPlans-create-dialog-component">
            <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="itineraryID">Itinerary ID:</label>
                <Dropdown id="itineraryID" value={_entity?.itineraryID?._id} optionLabel="name" optionValue="value" options={itineraryIDOptions} onChange={(e) => setValByKey("itineraryID", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["itineraryID"]) ? (
              <p className="m-0" key="error-itineraryID">
                {error["itineraryID"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="date">Date:</label>
                <Calendar id="date"  value={_entity?.date ? new Date(_entity?.date) : null} dateFormat="dd/mm/yy" onChange={ (e) => setValByKey("date", new Date(e.target.value))} showIcon showButtonBar  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["date"]) ? (
              <p className="m-0" key="error-date">
                {error["date"]}
              </p>
            ) : null}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="summary">Summary:</label>
                <InputTextarea id="summary" rows={5} cols={30} value={_entity?.summary} onChange={ (e) => setValByKey("summary", e.target.value)} autoResize  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["summary"]) ? (
              <p className="m-0" key="error-summary">
                {error["summary"]}
              </p>
            ) : null}
          </small>
            </div>
            <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(DayPlansCreateDialogComponent);

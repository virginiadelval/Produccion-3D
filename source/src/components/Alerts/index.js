import React from 'react'
import { getAlert, getArticlesData } from 'utils/configQueries'
import StepAlerts from '../StepAlerts'
import { useSelector } from 'react-redux'
import Alert from './Alert'

const Alerts = () => {
  const alertsIds = useSelector((state) => state.alerts.ids);
  const sectionId = useSelector((state) => state.categories.sectionId);
  const isModalOpenAlert = useSelector((state) => state.alerts.showModalAlert);
  const idArticle = useSelector((state) => state.alerts.showModalAlertId);
  const data = getArticlesData(idArticle);

  return (
    <>
      {sectionId.length > 1 &&
        sectionId[1] === 'Buildable' &&
        alertsIds
          .map(getAlert)
          .filter((alertData) => alertData)
          .map(({ id, title, text }) => (
            <Alert key={id} id={id} title={title} text={text} />
          ))
      }
      <StepAlerts isModalOpenAlert={isModalOpenAlert} content={data ? data.content : []} />
    </>
  )
}

export default Alerts
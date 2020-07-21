import React, { useContext } from 'react'
import { Link } from 'gatsby'
import { Card, CardBody } from '~components/common/card'
import { DefinitionPanelContext } from './definitions-panel'
import {
  DrillDown,
  Statistic,
  DefinitionLink,
} from '~components/common/statistic'

const CasesCard = ({
  stateSlug,
  positive,
  positiveIncrease,
  sevenDayIncrease,
}) => {
  const sevenDayIncreasePercent = Math.round(sevenDayIncrease * 100 * 10) / 10
  const drillDownValue = Number.isNaN(sevenDayIncreasePercent)
    ? 'N/A'
    : sevenDayIncreasePercent
  const drillDownSuffix = Number.isNaN(sevenDayIncreasePercent) ? '' : '%'
  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title="Cases"
      link={<Link to={`/data/state/${stateSlug}/cases`}>Historical data</Link>}
    >
      <CardBody>
        <Statistic title="Total cases" value={positive}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields: ['positive', 'negative'],
                highlight: 'positive',
              })
            }}
          />
          <DrillDown label="New cases" value={positiveIncrease} calculated />
          <DrillDown
            label="Increase in 7 days"
            value={drillDownValue}
            suffix={drillDownSuffix}
            calculated
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

const BaseTestsCard = ({
  fields = [],
  negative,
  negativeTestsField,
  pending,
  positive,
  positiveTestsField,
  stateSlug,
  title,
  totalTests,
  totalTestsField = 'totalTestResults',
}) => {
  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title={title}
      link={<Link to={`/data/state/${stateSlug}/tests`}>Historical data</Link>}
    >
      <CardBody>
        <Statistic title="Total tests" value={totalTests}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: totalTestsField,
              })
            }}
          />
        </Statistic>
        <Statistic title="Positive" value={positive}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: positiveTestsField,
              })
            }}
          />
        </Statistic>
        {pending && <Statistic title="Pending" value={pending} />}
        <Statistic title="Negative" value={negative}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: negativeTestsField,
              })
            }}
          />
        </Statistic>
      </CardBody>
    </Card>
  )
}

const TestsCard = ({
  stateSlug,
  negative,
  pending,
  totalTestResults,
  positive,
}) => (
  <BaseTestsCard
    fields={['negative', 'positive', 'totalTestResults']}
    negative={negative}
    negativeTestsField="negative"
    pending={pending}
    positive={positive}
    positiveTestsField="positive"
    stateSlug={stateSlug}
    title="Tests"
    totalTests={totalTestResults}
    totalTestsField="totalTestResults"
  />
)

const PCRTestsCard = ({
  stateSlug,
  totalTestsViral,
  positiveTestsViral,
  negativeTestsViral,
}) => (
  <BaseTestsCard
    fields={['negativeTestsViral', 'positiveTestsViral', 'totalTestsViral']}
    negative={negativeTestsViral}
    negativeTestsField="negativeTestsViral"
    positive={positiveTestsViral}
    positiveTestsField="positiveTestsViral"
    stateSlug={stateSlug}
    title="Tests (PCR)"
    totalTests={totalTestsViral}
    totalTestsField="totalTestsViral"
  />
)

const CumulativeHospitalizationCard = ({
  stateSlug,
  hospitalizedCumulative,
  inIcuCumulative,
  onVentilatorCumulative,
}) => (
  <Card
    title="Cumulative Hospitalization"
    link={
      <Link to={`/data/state/${stateSlug}/hospitalization`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      <Statistic
        title="Cumulative hospitalized"
        value={hospitalizedCumulative}
      />
      <Statistic title="Cumulative in ICU" value={inIcuCumulative} />
      <Statistic
        title="Cumulative on ventilator"
        value={onVentilatorCumulative}
      />
    </CardBody>
  </Card>
)

const OutcomesCard = ({
  stateSlug,
  onDefinitionsToggle,
  deathsLabel,
  death,
  deathConfirmed,
  deathProbable,
  recovered,
}) => {
  const fields = ['recovered', 'death']
  if (deathProbable) {
    fields.push('deathProbable')
  }
  if (deathConfirmed) {
    fields.push('deathConfirmed')
  }

  const definitionContext = useContext(DefinitionPanelContext)

  return (
    <Card
      title="Outcomes"
      link={
        <Link to={`/data/state/${stateSlug}/outcomes`}>Historical data</Link>
      }
    >
      <CardBody>
        <Statistic title="Recovered" value={recovered}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'recovered',
              })
            }}
          />
        </Statistic>
        <Statistic title={deathsLabel} value={death}>
          <DefinitionLink
            onDefinitionsToggle={() => {
              definitionContext({
                fields,
                highlight: 'death',
              })
            }}
          />
        </Statistic>
        {deathProbable && (
          <Statistic
            title="Probable deaths"
            value={deathProbable}
            definitionLink="#"
            onDefinitionsToggle={onDefinitionsToggle}
            subelement
          >
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'deathProbable',
                })
              }}
            />
          </Statistic>
        )}
        {deathConfirmed && (
          <Statistic
            title="Confirmed deaths"
            value={deathConfirmed}
            definitionLink="#"
            onDefinitionsToggle={onDefinitionsToggle}
            subelement
          >
            <DefinitionLink
              onDefinitionsToggle={() => {
                definitionContext({
                  fields,
                  highlight: 'deathConfirmed',
                })
              }}
            />
          </Statistic>
        )}
      </CardBody>
    </Card>
  )
}

const RaceEthnicityCard = ({ stateSlug, raceData }) => (
  <Card
    title="Race &amp; Ethnicity"
    link={
      <Link to={`/data/state/${stateSlug}/race-ethnicity`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      {raceData.combined && (
        <>
          <p>Reported race &amp; ethnicity data for:</p>
          <Statistic
            title="Cases"
            value={Math.round(raceData.combined.knownRaceEthPos * 100)}
            suffix="%"
          />
          <Statistic
            title="Death"
            value={Math.round(raceData.combined.knownRaceEthDeath * 100)}
            suffix="%"
          />
        </>
      )}
      {raceData.separate && (
        <>
          <p>Reported race data for:</p>
          <Statistic
            title="Cases"
            value={Math.round(raceData.separate.knownRacePos * 100)}
            suffix="%"
          />
          <Statistic
            title="Death"
            value={Math.round(raceData.separate.knownRaceDeath * 100)}
            suffix="%"
          />
          <p>Reported ethnicity &amp; data for:</p>
          <Statistic
            title="Cases"
            value={Math.round(raceData.separate.knownEthPos * 100)}
            suffix="%"
          />
          <Statistic
            title="Death"
            value={Math.round(raceData.separate.knownEthDeath * 100)}
            suffix="%"
          />
        </>
      )}
    </CardBody>
  </Card>
)

const CurrentHospitalizationCard = ({
  stateSlug,
  hospitalizedCurrently,
  inIcuCurrently,
  onVentilatorCurrently,
}) => (
  <Card
    title="Current Hospitalization"
    link={
      <Link to={`/data/state/${stateSlug}/hospitalization`}>
        Historical data
      </Link>
    }
  >
    <CardBody>
      <Statistic title="Currently hospitalized" value={hospitalizedCurrently} />
      <Statistic title="Currently in ICU" value={inIcuCurrently} />
      <Statistic
        title="Currently on ventilator"
        value={onVentilatorCurrently}
      />
    </CardBody>
  </Card>
)

export {
  CasesCard,
  TestsCard,
  PCRTestsCard,
  CumulativeHospitalizationCard,
  OutcomesCard,
  RaceEthnicityCard,
  CurrentHospitalizationCard,
}

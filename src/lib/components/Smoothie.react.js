import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import SmoothieChart from 'smoothie';
import SmoothieComponent, { TimeSeries } from 'react-smoothie';

/**
 * ExampleComponent is an example component.
 * It takes a property, `label`, and
 * displays it.
 * It renders an input with the property `value`
 * which is editable by the user.
 */
export default class Smoothie extends Component {
  constructor(props) {
    super(props);
    // this.chart = React.createRef();
    this.state = {millisPerPixel: this.props.millisPerPixel};
    // this.datas = {};
    // const colors =
    const axisProps = this.props.axisProps;

    // const datas = axisProps.map((n, i) => ({i:new TimeSeries()}));
    this.datas = [];
    for (var i=0; i < axisProps.length; i++) {
      let { name, r, g, b } = axisProps[i]
      this.datas.push({name: name, r: r, g: g, b: b, data: new TimeSeries()});
    }
    // console.log('new smoothie!', props, axisProps, this.datas)
  }

  createGraph(props) {
    // foreach (let i = 0; i < axisProps.length; i++) {
    // }

  }
  update(props) {
    const {extendData, id} = props;
    if (extendData) {
        for (var i = 0; i < extendData.length; i++)
        this.datas[i]['data'].append(new Date().getTime(), extendData[i]);
    }
  }
  updateMillis(props) {
    const {millisPerPixel} = props;
    this.state.millisPerPixel = millisPerPixel;
  }
  render() {
    const {id, label, value} = this.props;
    // const data = new TimeSeries();
    var smoothieGraph = (
      <SmoothieComponent
        ref="chart"
        id={id}
        responsive
        interpolation="bezier"
        // minValue={0}
        // maxValue={1}
        streamDelay={this.state.delay}
        millisPerPixel={this.state.millisPerPixel}
        tooltip={props => {
          if (!props.display) return <div />;

          return (
            <div
              style={{
                userSelect: 'none',
                background: '#444',
                padding: '1em',
                marginLeft: '20px',
                fontFamily: 'consolas',
                color: 'white',
                fontSize: '10px',
                pointerEvents: 'none',
              }}
            >
              <strong>{props.time}</strong>
              {props.data ? (
                <ul>
                  {props.data.map((data, i) => (
                    <li key={i} style={{ color: data.series.options.strokeStyle }}>
                      {data.value}
                    </li>
                  ))}
                </ul>
              ) : (
                <div />
              )}
            </div>
          );
        }}
        series={this.datas.map( (d) => (
          {
            data: d['data'],
            r: d['r'],
            g: d['g'],
            b: d['b'],
            lineWidth: 4,
           }
        )) }
      />);
      return (
        <div id={id+"div"}>
          <button onClick={() => this.setState({ toggle: !this.state.toggle })}>Toggle Existence</button>
          <button onClick={() => this.setState({ delay: (this.state.delay || 0) + 500 })}>Increment Delay</button>
          <button onClick={() => this.setState({ delay: (this.state.delay || 0) - 500 })}>Decrement Delay</button>
          {!this.state.toggle ? (
            smoothieGraph
          ) : (
            <div></div>
          )}

        </div>
      );
  }


  // componentDidMount() {
    // var ts1 = this.refs.chart.addTimeSeries({
    //   strokeStyle: 'rgba(0, 255, 0, 1)',
    //   fillStyle: 'rgba(0, 255, 0, 0.2)',
    //   lineWidth: 4,
    // });

    // this.refs.chart.addTimeSeries(TS2, {
    //   strokeStyle: { r: 255 },
    //   fillStyle: { r: 255, a: 0.5 },
    //   lineWidth: 4,
    // });

    // this.dataGenerator = setInterval(function() {
    //   var time = new Date().getTime();

      // Generate times slightly in the future
      // time += 1000;

      // ts1.append(time, Math.random());
      // TS2.append(time, Math.random());
  //     TS.append(time, Math.random());
  //   }, 500);
  // }
//
//   componentWillUnmount() {
//     clearInterval(this.dataGenerator);
//   }
  componentWillReceiveProps(nextProps) {
    const extendDataChanged =
            this.props.extendData !== nextProps.extendData;
    if (extendDataChanged) {
    this.update(nextProps)
  }
  const millisChanged = this.props.millisPerPixel !== nextProps.millisPerPixel;
  if (millisChanged) {
    this.updateMillis(nextProps)
}
  }
}

Smoothie.defaultProps = {};

Smoothie.propTypes = {
    /**
     * The ID used to identify this component in Dash callbacks
     */
    id: PropTypes.string,

    /**
     * A label that will be printed when this component is rendered.
     */
    label: PropTypes.string.isRequired,

    /**
     * The value displayed in the input
     */
    value: PropTypes.string,

    /**
    * The names and properties of all axis (or axes) of the graph.
    */
    axisProps: PropTypes.arrayOf(PropTypes.string).isRequired,

    /**
    * Speed at which graph flows
    */
    millisPerPixel: PropTypes.number,

    /**
    * New data for graph.
    */
    extendData: PropTypes.arrayOf(PropTypes.number),

    /**
     * Dash-assigned callback that should be called whenever any of the
     * properties change
     */
    setProps: PropTypes.func
};

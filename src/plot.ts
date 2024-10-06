import * as d3 from 'd3';

// Initialize the global document.
(await import('./document')).createDocument();

export function createScatterPlot(
  data: Record<string, any>[],
  options?: {
    label?: string;
    x?: string;
    y?: string;
    colorDark?: string;
    colorLight?: string;
    fontFamily?: string;
  },
): SVGSVGElement | undefined {
  // Specifying the data

  const { label, x, y, colorDark, colorLight, fontFamily } = {
    label: 'label',
    x: 'x',
    y: 'y',
    colorDark: '#000',
    colorLight: '#fff',
    fontFamily: 'sans-serif',
    ...options,
  };

  data = data.map((d) => {
    d = { ...d };
    d[x] = new Date(d[x]);
    return d;
  });

  // Specifying the dimensions

  const margin = { top: 50, right: 50, bottom: 70, left: 70 };
  const width = 800 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  // Create the canvas and plot

  const canvas = d3
    .create('svg')
    .classed('scatter-plot', true)
    .attr('xmlns', 'http://www.w3.org/2000/svg')
    .attr('version', '1.1')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .style('background-color', colorLight);
  const plot = canvas
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Plot the x-axis

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(data, (d: any) => d[x]) as [Date, Date])
    .range([0, width]);

  const xAxis = d3
    .axisBottom<Date>(xScale)
    .ticks(d3.timeMonth.every(6))
    .tickFormat(d3.timeFormat('%Y-%m'));

  plot
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(xAxis)
    .selectAll('text')
    .attr('text-anchor', 'middle')
    .attr('fill', colorDark)
    .attr('font-family', fontFamily)
    .attr('font-size', '12px');

  canvas
    .append('text')
    .attr('x', margin.left + width / 2)
    .attr('y', height + margin.top + margin.bottom - 25)
    .attr('text-anchor', 'middle')
    .attr('fill', colorDark)
    .attr('font-family', fontFamily)
    .attr('font-size', '15px')
    .text(x);

  // Plot the y-axis

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d: any) => d[y]) + 5])
    .range([height, 0]);

  const yAxis = d3.axisLeft(yScale).ticks(5);

  plot
    .append('g')
    .call(yAxis)
    .selectAll('text')
    .attr('fill', colorDark)
    .attr('font-family', fontFamily)
    .attr('text-anchor', 'end')
    .attr('font-size', '12px');

  canvas
    .append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', -(margin.top + height / 2))
    .attr('y', 25)
    .attr('text-anchor', 'middle')
    .attr('fill', colorDark)
    .attr('font-family', fontFamily)
    .attr('font-size', '15px')
    .text(y);

  // Plot the labels

  plot
    .selectAll('text.label')
    .data(data)
    .enter()
    .append('text')
    .attr('id', (d: any) => `label-${d[label]}`)
    .attr('x', (d: any) => xScale(d[x]))
    .attr('y', (d: any) => yScale(d[y]))
    .attr('dy', '-12px')
    .attr('text-anchor', 'middle')
    .attr('alignment-baseline', 'middle')
    .attr('fill', colorDark)
    .attr('font-family', fontFamily)
    .attr('font-size', '12px')
    .style('display', 'none')
    .style('pointer-events', 'none')
    .text((d: any) => d[label]);

  // Plot the circles

  plot
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d: any) => xScale(d[x]))
    .attr('cy', (d: any) => yScale(d[y]))
    .attr('r', 4)
    .attr('fill', colorDark)
    .attr('id', (d: any) => `dot-${d[label]}`)
    .attr('stroke', colorLight)
    .attr('stroke-width', 1)
    .attr('cursor', 'pointer')
    .attr('onmouseenter', (d: any) => {
      const labelId = `label-${d[label]}`;
      return `document.getElementById('${labelId}').style.display='block'`;
    })
    .attr('onmouseout', (d: any) => {
      const labelId = `label-${d[label]}`;
      return `document.getElementById('${labelId}').style.display='none'`;
    });

  return canvas.node() ?? undefined;
}

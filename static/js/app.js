// Build the metadata panel
function buildMetadata(sampleNo) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadata = data.metadata;

    // Filter the metadata for the object with the desired sample number
    let desiredSamples = metadata.filter(sample => sample.id == sampleNo);
    let sample = desiredSamples[0];

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select('#sample-metadata');

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (value in sample) {
      panel.append("h6").text(value.toUpperCase()+": "+sample[value])
    };

  });
}

// function to build both charts
function buildCharts(sampleNo) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;

    // Filter the samples for the object with the desired sample number
    let desiredSamples = samples.filter(sample => sample.id == sampleNo);
    let sample = desiredSamples[0];

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = sample.otu_ids;
    let otu_labels = sample.otu_labels;
    let sample_values = sample.sample_values;

    // Build a Bubble Chart
    let trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
    };

    let data1 = [trace1];

    let layout1 = {
      title: 'Bacteria Cultures Per Sample',
      xaxis: {title: 'OTU ID'},
      yaxis: {title: 'Number of Bacteria'}
    };


    // Render the Bubble Chart
    Plotly.newPlot('bubble', data1, layout1);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Build a Bar Chart
    // Don't forget to slice and reverse the input data appropriately

    let trace2 = {
      x: sample_values.slice(0,10).reverse(),
      y: otu_ids.slice(0,10).map(id => 'OTU '+ id).reverse(),
      text: otu_labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: 'h',
    };

    let data2 = [trace2];

    let layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      xaxis: {title: 'Number of Bacteria'},
    };



    // Render the Bar Chart
    Plotly.newPlot('bar', data2, layout2);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select('#selDataset');

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name) => {
      dropdown.append('option').text(name).property('value')
    });

    // Get the first sample from the list
    let first = names[0];

    // Build charts and metadata panel with the first sample
    buildMetadata(first);
    buildCharts(first);
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Initialize the dashboard
init();

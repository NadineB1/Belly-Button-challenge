// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    var metadata = data.metadata;
    // console.log(metadata);


    // Filter the metadata for the object with the desired sample number
    let filteredMetadata = metadata.filter(x => x.id == sample)[0]
    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    Object.entries(filteredMetadata).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field

    let samples = data.samples;
    console.log(samples);
    // Filter the samples for the object with the desired sample number

    let filteredSamples = samples.filter(x => x.id == sample)[0]
    console.log(filteredSamples);
    // Get the otu_ids, otu_labels, and sample_values
    let otuIds = filteredSamples.otu_ids;
    let otuLabels = filteredSamples.otu_labels;
    let sampleValues = filteredSamples.sample_values;
    console.log(otuIds);
    console.log(otuLabels);
    console.log(sampleValues);
    // Build a Bubble Chart
    
// Sample data for the Bubble Chart
var trace1 = {
  x: otuIds,
  y: sampleValues,
  mode: 'markers',
  marker: {
    size: sampleValues,
    text: otuLabels,
    color: otuIds,
  }
};

var data = [trace1];

var layout = {
  title: 'Bacteria Cultures per sample',
  showlegend: false,
  height: 600,
  width: 600,
  xaxis: {title:"OTU ID"},
  yaxis: {title:"Number of Bacteria"}
};

Plotly.newPlot('bubble', data, layout);
    
  
  // Render the Bubble Chart
  
 

  
  // For the Bar Chart, map the otu_ids to a list of strings for your yticks
  var data = [
    {
      x: sampleValues,
      y: otuIds,
      type: 'bar',
      orientation: "h"
      
    }
  ];
  console.log(otuIds);
  console.log(sampleValues)
 // Plotly.newPlot('bar', data);

  

// Create the data object for Plotly with the top 10 values
let otu_ids = otuIds.map(otuID => `OTU ${otuID} `);

let barData = [
    {
     y: otu_ids.slice(0, 10).reverse(),
     x: sampleValues.slice(0, 10).reverse(),
     text: otuLabels.slice(0, 10).reverse(),
     type: "bar",
     orientation: "h",
      }
    ];

var barLayout = 
  {
     title: "Top 10 Bacteria Cultures Found",
     margin: {t:30,l:150},
     xaxis: {title:"Number of Bacteria"}
     
   }
 ;
 
// Display the top 10 values in the bar chart
Plotly.newPlot('bar', barData,barLayout);






});
}



  // Build a Bar Chart
  // Don't forget to slice and reverse the input data appropriately
  
  

  // Render the Bar Chart
  
  





// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;
    // console.log(names);

    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdown = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < names.length; i++) {
      dropdown.append("option").text(names[i]).property("value", names[i])

    }

    // Build charts and metadata panel with the first sample
    buildCharts(names[0])
    buildMetadata(names[0])
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample)
  buildMetadata(newSample)
}

// Initialize the dashboard
init();

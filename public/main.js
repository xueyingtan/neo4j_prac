if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

function ready(){
    d3.csv("tweetdata.csv", lineChart);
}

function lineChart(data) {
    xScale = d3.scale.linear().domain([1,10.5]).range([20,480]);	
    yScale = d3.scale.linear().domain([0,35]).range([480,20]);
    xAxis = d3.svg.axis()
         .scale(xScale)
         .orient("bottom")
         .tickSize(480)
         .tickValues([1,2,3,4,5,6,7,8,9,10]);	
    d3.select("svg").append("g").attr("id", "xAxisG").call(xAxis);
    yAxis = d3.svg.axis()
         .scale(yScale)
         .orient("right")
         .ticks(10)
         .tickSize(480);
    d3.select("svg").append("g").attr("id", "yAxisG").call(yAxis);
    d3.select("svg").selectAll("circle.tweets")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "tweets")
         .attr("r", 5)
         .attr("cx", function(d) {return xScale(d.day)})
         .attr("cy", function(d) {return yScale(d.tweets)})
         .style("fill", "black");	
 
    d3.select("svg").selectAll("circle.retweets")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "retweets")
         .attr("r", 5)
         .attr("cx", function(d) {return xScale(d.day)})
         .attr("cy", function(d) {return yScale(d.retweets)})
         .style("fill", "lightgray");
    d3.select("svg").selectAll("circle.favorites")
         .data(data)
         .enter()
         .append("circle")
         .attr("class", "favorites")
         .attr("r", 5)
         .attr("cx", function(d) {return xScale(d.day)})
         .attr("cy", function(d) {return yScale(d.favorites)})
         .style("fill", "gray");

    var tweetLine = d3.svg.line()
    .x(function(d) {	
        return xScale(d.day);
    })
    .y(function(d) {	
    return yScale(d.tweets);
    });
     d3.select("svg")
         .append("path")
         .attr("d", tweetLine())	
         .attr("fill", "none")
         .attr("stroke", "darkred")
         .attr("stroke-width", 2);


 };


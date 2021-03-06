function calculateFitness(){

    for(let i = 0; i < population.length; i++){
        let d = calcDistance(cities, population[i]);
        if(d < recordDistance){ 
          recordDistance = d;
          bestEver = population[i];
        }
        fitness[i] = 1 / (d + 1);
      }
}

function normalizeFitness(){
    let sum = 0;
    for(let i = 0; i < fitness.length; i++){
        sum += fitness[i];
    }
    for(let i = 0; i < fitness.length; i++){
        fitness[i] /= sum;
    }
}

function nextGeneration(){
    let newPopulation = [];
    for(let i = 0; i < population.length; i++){
        let orderA = pickOne(population, fitness);
        let orderB = pickOne(population, fitness);
        while(orderB == orderA){
            orderB = pickOne(population, fitness);
        }
        let order = crossOver(orderA, orderB);
        mutate(order);
        
        newPopulation[i] = order;
    }
    population = newPopulation;
}

function pickOne(list, prob){
    let index = 0;
    let r = random(1);

    while(r > 0){
        r -= prob[index];
        index++;
    }
    index--;
    return list[index].slice();
}

function crossOver(orderA, orderB){
    let breakPoint = floor(random(1, orderA.length));
    
    let neworder = orderA.slice(0, breakPoint);

    for(let i = breakPoint; i < orderB.length; i++){
        let city = orderB[i];
        if(!neworder.includes(city)){
            neworder.push(city);
            
        }
    }

    if (neworder.length != orderB.length){
        for(let i = breakPoint; i < orderA.length; i++){
            let city = orderA[i];
            if(!neworder.includes(city)){
                neworder.push(city);
                
            }
        }
    }

    return neworder;
}


function mutate(order){
    let indexA = floor(random(order.length));
    let indexB = floor(random(order.length));
    swap(order, indexA, indexB); 
}
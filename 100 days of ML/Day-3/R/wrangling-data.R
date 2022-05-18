library(dslabs)
library(dplyr)
data(murders)

murders <- mutate(murders, rate = ((total) / (population)) * 100)
filter(murders, rate <= 0.71)

nt <- select(murders,state, region, rate)

#doing all of the above operation in one line using pipe

murders %>% select(state, region, rate) %>% filter(rate <= 0.71)

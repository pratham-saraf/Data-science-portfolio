library(dslabs)
data(na_example)

sum(is.na(na_example))

ifelse(is.na(na_example),0,na_example)

cleared_data <- sum(is.na(na_example))

sum(is.na(cleared_data))

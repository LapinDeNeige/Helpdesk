function problem()
{
    this.getProblem =function(problemStatus)
    {
    /**TO JSON FILE **/
    let retProblem;
    if(problemStatus=="not-access-folder")
        retProblem="Shared file access problem";
    else if(problemStatus=="not-access-network")
        retProblem="Internet access problem";
    else if(problemStatus=="not-access-cartridge")
        retProblem="Cartridge exchange";
    else if(problemStatus=="not-access-programm")
        retProblem="Programm issue";
    else if(problemStatus=="not-access-printer")
        retProblem="Printer problem";
    else if(problemStatus=="not-access-phone")
        retProblem="Phone problem";
    else
        retProblem="Other";

        return retProblem;
    }
}
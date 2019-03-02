function startover() {
	document.user_entry_c.home_value_c.value="";
	document.user_entry_c.months_c.value="";
	document.user_entry_c.rate_c.value="";
	document.user_entry_c.extra_monthly_c.value="0";
	document.user_entry_c.extra_annualy.value="0";
	document.user_entry_c.fullname_c.value="";
	document.user_entry_c.down_payment_c.value="";
	document.user_entry_c.loan_amt_c.value="";
	document.getElementById("loan_summary_c").innerHTML="";
	document.getElementById("table_c").innerHTML="";
	document.getElementById("table_header_c").innerHTML="";
	document.getElementById("saving_c").innerHTML="";
	document.getElementById("canvas_c").innerHTML="";
}

function validate() {
	// body...
	var home_value_c = document.user_entry_c.home_value_c.value;
	var months_c = document.user_entry_c.months_c.value;
	var rate_c = document.user_entry_c.rate_c.value;
	var extra_monthly_c = document.user_entry_c.extra_monthly_c.value;
	var fullname_c = document.user_entry_c.fullname_c.value;
	var down_payment_c =document.user_entry_c.down_payment_c.value;
	var extra_annualy =document.user_entry_c.extra_annualy.value;
	var loan_amt_c = document.user_entry_c.loan_amt_c.value;

	if (home_value_c <= 0 || isNaN(Number(home_value_c))) {

		alert("Please enter a valid loan amount.");
		document.user_entry_c.home_value_c.value="";
	}
	else if (months_c <= 0 || parseInt(months_c) != months_c) {
		alert("Please enter a valid number of months_c.");
		document.user_entry_c.months_c.value="";
	}
	else if(loan_amt_c <= 0 || isNaN(Number(loan_amt_c))){
		alert("Please enter a valid Home Value.");
		document.user_entry_c.loan_amt_c.value="";
	}
	else if(rate_c <= 0 || isNaN(Number(rate_c))){
		alert("Please enter a valid interest_c rate_c.");
		document.user_entry_c.rate_c.value="";
	}
	else if (extra_monthly_c < 0 || isNaN(Number(extra_monthly_c))) {
		alert("Please enter a valid extra_monthly_c payments");
		document.user_entry_c.extra_monthly_c.value="";
	}
	else if (extra_annualy < 0 || isNaN(Number(extra_annualy))) {
		alert("Please enter a valid extra_annualy payments");
		document.user_entry_c.extra_annualy.value="";
	}
	else if (down_payment_c < 0 || isNaN(Number(down_payment_c))) {
		alert("Please enter a valid down payment");
		document.user_entry_c.down_payment_c.value="";
	}
	else if (String(fullname_c) != fullname_c) {
		alert("Please enter text only for name field");
		document.user_entry_c.fullname_c.value="";
	}
	else{
	
		calc(fullname_c,parseFloat(home_value_c),parseFloat(down_payment_c), 
			parseFloat(loan_amt_c),parseInt(months_c),parseFloat(rate_c),
			parseFloat(extra_monthly_c),parseFloat(extra_annualy));
	}
}

function calc(fullname_c,home_value_c, down_payment_c,loan_amt_c,months_c,rate_c,extra_monthly_c, extra_annualy, total_interest_c) {
	j = rate_c/100; 
	loan_amt_c = home_value_c - down_payment_c;
	var monthly_payment_c = loan_amt_c * (j/12)*Math.pow((1+j/12), months_c)/ (Math.pow((1+j/12), months_c) - 1 ); 
	var monthly_payment_without_extra_c = loan_amt_c * (j/12)*Math.pow((1+j/12), months_c)/ (Math.pow((1+j/12), months_c) - 1 ); 
	
	var info = "";
	info += "<table width = '250'>";
	info += "<tr><td colspan ='2' align='center'><h3>Mortgage Repayment Summmary</h3></td>";

	info += "<tr><td>Monthly Payment:</td>";
	info += "<td id='blue' align='left'>$" +round(monthly_payment_c+extra_monthly_c,2)+ "</td></tr>";

	info += "<tr><td>Loan Amount:</td>";
	info += "<td id='blue' align ='left'>$" +loan_amt_c+ "</td></tr>";

	info += "<tr><td>Initial Life of Loan</td>";
	info += "<td id='blue' align='left'>" +months_c+ "</td></tr>";

	info += "<tr><td>Interest Rate:</td>";
	info += "<td id='blue' align='left'>" +rate_c+ "</td></tr>";

	info += "<tr><td>Extra Monthly:</td>";
	info += "<td id='blue' align='left'>$" +extra_monthly_c+ "</td></tr>";

	info += "<tr><td>Extra Yearly:</td>";
	info += "<td id='blue' align='left'>$" +extra_annualy+ "</td></tr>";

	
	info += "</table_c>";

	document.getElementById("loan_summary_c").innerHTML=info; 
	//------------------------------Amoritization table_c---------------------------------
	var table_c = "";

	table_c += "<table cellpadding = '5'>";

	table_c += "<tr>";
		table_c += "<td width = '100'>&nbsp;</td>";
		table_c += "<td width = '100'>&nbsp;</td>"; 
		table_c += "<td width = '100'>&nbsp;</td>"; 
		table_c += "<td width = '100'>&nbsp;</td>"; 
		table_c += "<td width = '80'>&nbsp;</td>"; 
	table_c +="</tr>";

	var current_balance_c = loan_amt_c;
	var payment_number_c = 1;
	var total_interest_c = 0;

	var payment_number_without_extra_c = 1
	var current_balance__without_extra_c = loan_amt_c;
	var total_interest__without_extra_c = 0;


	while(current_balance__without_extra_c > 0) {
		//Create rows

		interest_without_extra_c = (j/12)*current_balance__without_extra_c; // This calculates the portion of your monthly payment that goes towards the interest

		if(monthly_payment_without_extra_c > current_balance__without_extra_c){
			monthly_payment_without_extra_c = current_balance__without_extra_c + interest_without_extra_c;
		}
		principal_without_extra_c = monthly_payment_without_extra_c - interest_without_extra_c;
		current_balance__without_extra_c = current_balance__without_extra_c - principal_without_extra_c;
		total_interest__without_extra_c = total_interest__without_extra_c + interest_without_extra_c;
		payment_number_without_extra_c++;

	}
	

	monthly_payment_c = monthly_payment_c + extra_monthly_c;
	while(current_balance_c > 0) {
		//Create rows

		interest_c = (j/12)*current_balance_c; // This calculates the portion of your monthly payment that goes towards the interest_c

		if(monthly_payment_c > current_balance_c){
			monthly_payment_c = current_balance_c + interest_c;
		}
		principal_c = monthly_payment_c - interest_c;
		current_balance_c = current_balance_c - principal_c;
		total_interest_c = total_interest_c + interest_c;

		if (payment_number_c === 13 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c; //
			current_balance_c = current_balance_c - principal_c;

			table_c += "<tr>";
				table_c += "<td>"+payment_number_c+"</td>";
				table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
				table_c += "<td>$"+round(principal_c,2)+"</td>";
				table_c += "<td>$"+round(interest_c,2)+"</td>";
				table_c += "<td>$"+round(current_balance_c,2)+"</td>";
			table_c += "</tr>"
		}
		else if(payment_number_c === 1 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 25 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 37 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 49 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 61 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 73 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 85 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 97 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 109 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 121 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 25 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 133 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 145 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 156 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 169 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 181 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 193 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 205 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 217 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 229 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 241 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 253 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 265 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 277 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 289 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 301 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 313 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 325 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 337 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		else if(payment_number_c === 349 && extra_annualy > 0) {
			yearly_c = monthly_payment_c+extra_annualy;
			principal_c = yearly_c - interest_c;
			current_balance_c = current_balance_c - principal_c;
			table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td id='year'>$"+round(yearly_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}
		
		else{
		//display row
		table_c += "<tr>";
			table_c += "<td>"+payment_number_c+"</td>";
			table_c += "<td>$"+round(monthly_payment_c,2)+"</td>";
			table_c += "<td>$"+round(principal_c,2)+"</td>";
			table_c += "<td>$"+round(interest_c,2)+"</td>";
			table_c += "<td>$"+round(current_balance_c,2)+"</td>";
		table_c += "</tr>"
		}

		
		payment_number_c++;
//------------------------------------Inserting years every 12 months_c----------------------------------------//		
		
		if(payment_number_c === 13){
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100' >Year 2</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 25) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year'  width = '100' >Year 3</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 37) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year'  width = '100'>Year 4</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 49) {
	
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 5</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 61) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year'  width = '100'>Year 6</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 73) {
			
		table_c += "<table cellpadding = '5'>";

		table_c += "<tr>";
			table_c += "<td id='year' width = '100'>Year 7</td>";
			table_c += "<td width = '100'>&nbsp;</td>"; 
			table_c += "<td width = '100'>&nbsp;</td>"; 
			table_c += "<td width = '100'>&nbsp;</td>"; 
			table_c += "<td width = '80'>&nbsp;</td>"; 
		table_c +="</tr>";
		}
		else if (payment_number_c === 85) {
			
		table_c += "<table cellpadding = '5'>";

		table_c += "<tr>";
			table_c += "<td id='year' width = '100'>Year 8</td>";
			table_c += "<td width = '100'>&nbsp;</td>"; 
			table_c += "<td width = '100'>&nbsp;</td>"; 
			table_c += "<td width = '100'>&nbsp;</td>"; 
			table_c += "<td width = '80'>&nbsp;</td>"; 
		table_c +="</tr>";
		}
		else if (payment_number_c === 97) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 9</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 109) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 10</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 121) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 11</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 133) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 12</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 145) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 13</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 156) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 14</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}

		else if (payment_number_c === 169) {
		
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 15</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 181) {
		
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 16</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 193) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 17</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 205) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 18</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 217) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 19</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 229) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 20</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 241) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 21</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 253) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 22</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 265) {
		
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 23</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 277) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 24</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 289) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 25</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 301) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 26</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 313) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 27</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}
		else if (payment_number_c === 325) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 28</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 337) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 29</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
		}
		else if (payment_number_c === 349) {
			
			table_c += "<table cellpadding = '5'>";

			table_c += "<tr>";
				table_c += "<td id='year' width = '100'>Year 30</td>";
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '100'>&nbsp;</td>"; 
				table_c += "<td width = '80'>&nbsp;</td>"; 
			table_c +="</tr>";
			}

		else{

			document.getElementById("table_c").innerHTML= table_c;
		}

	}
		
	//info is a string containing all the html table_c code
	months_c_saved = months_c - payment_number_c;
	loan_plus_interest_c = loan_amt_c + total_interest_c;

	interest_saving_c = total_interest__without_extra_c - total_interest_c;
	
	var saving_c = "";

	saving_c += "<table width = '250'>";
	saving_c += "<tr><td colspan ='2' align='center'><h3>Saving by Extra Payment</h3></td>";

	saving_c += "<tr><td>Actual Life of Loan:</td>";
	saving_c += "<td id='blue'align='left'>" +(payment_number_c-1)+ " months</td></tr>";

	saving_c += "<tr><td>PayOff Earlier by:</td>";
	saving_c += "<td id='blue' align='left'>" +(months_c_saved+1)+ " months</td></tr>";

	saving_c += "<tr><td>Interest Saving:</td>";
	saving_c += "<td id='blue' align='left'>$" +round(interest_saving_c,2)+ "</td></tr>";

	saving_c += "<tr><td>Total Interest:</td>";
	saving_c += "<td id='blue' align='left'>$" +round(total_interest_c,2)+ "</td></tr>";

	saving_c += "<tr><td>Principal + Total Interest:</td>";
	saving_c += "<td id='blue' align='left'>$" +round(loan_plus_interest_c,2)+ "</td></tr>";

	saving_c += "</table_c>";

	document.getElementById("saving_c").innerHTML=saving_c; 

	document.getElementById("table_c").innerHTML=table_c; //info is a string containing all the html table_c code

	var ctx = document.getElementById('myChart_c').getContext('2d');
	var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        labels: ["Interest Saving","Total Interest","Total Principal", "Principal + Interest"],
        datasets: [{
	    label: ["Interest Saving"],
            data: [round(interest_saving_c,2),round(total_interest_c,2),round(loan_amt_c,2),round(loan_plus_interest_c,2)],
	   backgroundColor:[ 'rgb(0,128,0)'
					,'rgb(255,215,0)'
					, 'rgb(0,191,255)'
					, 'rgb(255,69,0)'],
	        borderwidth: 0	
        }]
    },

    // Configuration options go here
    options: {
	    title: {
            display: true,
            text: 'Interest Saving by Extra Payments'
        },
	
	scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }],
        yAxes: [{
            gridLines: {
                drawOnChartArea: false
            }
        }]
    }
	
	}

});

	var ct = document.getElementById('chart_c').getContext('2d');
	var char = new Chart(ct, {
    // The type of chart we want to create
    type: 'pie',

    // The data for our dataset
    data: {
        labels: ["PayOff Earlier By", "Actual Life of Loan" ,"Initial Life of Loan"],
        datasets: [{
        data: [months_c_saved+1,payment_number_c-1, months_c],
	backgroundColor:[ 'rgb(0,128,0)'
				    ,'rgb(0,0,255)'
				    , 'rgb(255,69,0)'],
        borderwidth: 0	
            
        }]
    },

    // Configuration options go here
    options: {
	    title: {
            display: true,
            text: 'Time Saving by Extra Payments',
	   legend: {
                display: true,
                position: 'botttom'
	   }
        }
	    }
});


}


function round(num, dec) {
	// body...
	return (Math.round(num*Math.pow(10, dec)) / Math.pow(10, dec)).toFixed(dec);
}



	 


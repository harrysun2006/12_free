package com.free.zf.service;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.free.zf.dao.JpaDao;
import com.free.zf.dto.Garden;
import com.free.zf.dto.Plot;

@Service
public class GardenService {
	
	  @Autowired
	  @Qualifier("daoZF")
	  protected JpaDao dao;
	  
	 public void save(Garden garden){
		 dao.save(garden);	 
	 }
	  public void add(Garden garden) {
		    dao.add(garden);
	   }
	  
	  public Calendar tocalendar(String ca) throws ParseException{
		  SimpleDateFormat cc = new SimpleDateFormat("yyyy-mm-dd");
		  Date date = cc.parse(ca);
		  Calendar calendar =Calendar.getInstance();
		  calendar.setTime(date);
		  return calendar;
	  }

}

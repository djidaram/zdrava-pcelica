import React from "react";
import dynamic from "next/dynamic";

import { LocationOn } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

import { Link } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const Contact = ({ contact, position, social_networks }) => {
  const DynamicMap = dynamic(() => import("./common/Map"), { ssr: false });

  const { address, email, telephone } = contact;
  const { latitude, longitude } = position;

  const { working_hours } = contact;

  const openHoursInfo = working_hours.schedule.map((dayAndTime, key) => {
    const day = Object.keys(dayAndTime)[0];
    const timeInterval = dayAndTime[day];

    return (
      <TableRow key={key}>
        <TableCell>{day}:</TableCell>
        <TableCell>{timeInterval}</TableCell>
      </TableRow>
    );
  });

  const socialNetworks = social_networks.map((network, key) => {
    if (network.name === "Instagram") {
      return (
        <Link
          className="social-network-link instagram"
          href={`https://${network.url}`}
          key={key}
          target="_blank"
        >
          <InstagramIcon className="social-network-logo" />
        </Link>
      );
    }
  });

  return (
    <>
      <div className="contact">
        <div className="contact-info">
          <TableContainer className="working-hours">
            <Table>
              <TableBody>{openHoursInfo}</TableBody>
            </Table>
          </TableContainer>
          <div>
            <div>
              <LocationOn className="contact-icons" />
              <span className="contact-text">{address}</span>
            </div>
            <div>
              <EmailIcon className="contact-icons" />
              <span className="contact-text">{email}</span>
            </div>
            <div>
              <PhoneIcon className="contact-icons" />
              <span className="contact-text">{telephone}</span>
            </div>
          </div>
          {socialNetworks.length > 0 && (
            <div className="social-networks">
              <span>Pratite nas na društvenim mrežama</span>
              {socialNetworks}
            </div>
          )}
        </div>
        <DynamicMap position={[latitude, longitude]} />
      </div>
    </>
  );
};

export default Contact;

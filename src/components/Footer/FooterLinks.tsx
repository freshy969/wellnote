import { Text, Container, ActionIcon, Group, rem, Title, Divider } from '@mantine/core';
import { IconBrandGithubFilled } from '@tabler/icons-react';
import classes from './FooterLinks.module.css';


function Logo() {
  return (
    <>
      <Title
        style={{ cursor: "pointer" }}
        className={classes.title}
      >
        dolph
      </Title>
    </>
  );
}


// const data = [
//   {
//     title: 'About',
//     links: [
//       { label: 'Features', link: '#' },
//       { label: 'Pricing', link: '#' },
//       { label: 'Support', link: '#' },
//       { label: 'Forums', link: '#' },
//     ],
//   },
//   {
//     title: 'Project',
//     links: [
//       { label: 'Contribute', link: '#' },
//       { label: 'Media assets', link: '#' },
//       { label: 'Changelog', link: '#' },
//       { label: 'Releases', link: '#' },
//     ],
//   },
// ];

export function FooterLinks() {
  // const groups = data.map((group) => {
  //   const links = group.links.map((link, index) => (
  //     <Text<'a'>
  //       key={index}
  //       className={classes.link}
  //       component="a"
  //       href={link.link}
  //       onClick={(event) => event.preventDefault()}
  //     >
  //       {link.label}
  //     </Text>
  //   ));

  //   return (
  //     <div className={classes.wrapper} key={group.title}>
  //       <Text className={classes.title}>{group.title}</Text>
  //       {links}
  //     </div>
  //   );
  // });

  return (
    <footer className={classes.footer}>
      <Container size={"lg"} className={classes.inner}>
        <div className={classes.logo}>
          <Logo />
          <Text size="xs" c="dimmed" className={classes.description}>
          A minimal, simple password and notes manager
          </Text>
        </div>
        {/* <div className={classes.groups}>{groups}</div> */}
      </Container>
      <Divider mt={rem(40)} mb={"xl"} />
      <Container size={"lg"} className={classes.afterFooter}>
        <Text c="dimmed" size="xs" className={classes.noCaption}>
          Open source project
        </Text>

        <Group gap={0} className={classes.social} justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" color="gray" variant="subtle">
            <IconBrandGithubFilled style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </footer>
  );
}